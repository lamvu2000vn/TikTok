<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Exception;
use App\helpers\VideoStream;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

// Model
use App\Models\User;
use App\Models\Video;
use App\Models\Following;
use App\Models\Comment;
use App\Models\CommentLiked;
use App\Models\VideoLiked;

class VideoController extends Controller
{
    public function __construct()
    {
        
    }

    public function forYouPage(Request $request)
    {
        try {
            $limit = $request->limit;
            $offset = $request->offset;

            $videoIds = Video::orderBy('post_date')
                ->limit($limit)
                ->offset($offset)
                ->get()
                ->pluck('id')
                ->toArray();

            $videos = Video::getVideo($videoIds);
    
            return response()->json([
                'status' => 200,
                'message' => 'success',
                'data' => $videos
            ]);
        } catch (Exception $e) {
            return response()->json([
                'status' => 500,
                'message' => $e->getMessage()
            ]);
        }
    }

    public function followingPage(Request $request)
    {
        try {
            $user = $request->user();
            $limit = $request->limit;
            $offset = $request->offset;

            if (!$user) {
                $sql = DB::select("
                    SELECT videos.id
                    FROM videos
                    WHERE videos.user_id IN (
                        SELECT	users.id
                        FROM users
                        WHERE users.verified = 1
                    )
                    ORDER BY RAND()
                    LIMIT 30
                ");

                $videoIds = [];
                foreach ($sql as $val) {
                    $videoIds[] = $val->id;
                }

                $videos = Video::getVideo($videoIds);

                return response()->json([
                    'status' => 200,
                    'data' => $videos
                ]);
            }

            $followingIds = Following::where('user_id', $user->id)
                                        ->select('following_id')
                                        ->get()
                                        ->pluck('following_id')
                                        ->toArray();

            $videoIds = Video::whereIn('user_id', $followingIds)
                                ->orderBy('post_date', 'desc')
                                ->select('id')
                                ->limit($limit)
                                ->offset($offset)
                                ->get()
                                ->pluck('id')
                                ->toArray();

            if (count($videoIds) === 0) {
                return response()->json([
                    'status' => 200,
                    'message' => 'all',
                    'data' => []
                ]);
            }

            $videos = Video::getVideo($videoIds);

            return response()->json([
                'status' => 200,
                'data' => $videos
            ]);

        } catch (Exception $e) {
            return response()->json([
                'status' => 500,
                'message' => $e->getMessage()
            ]);
        }
    }

    public function getCommentsOfVideo(Request $request, $id)
    {
        try {
            $limit = $request->limit;
            $offset = $request->offset;

            $comments = Video::getCommentsOfVideo($id, $limit, $offset);

            return response()->json([
                'status' => 200,
                'data' => $comments
            ]);

        } catch (Exception $e) {
            return response()->json([
                'status' => 500,
                'message' => $e->getMessage()
            ]);
        }
    }

    public function streamVideo($filename)
    {
        $path = public_path("videos/$filename");
        $stream = new VideoStream($path);
        $stream->start();
    }

    public function likeVideo(Request $request, $id)
    {
        try {
            $user = $request->user();

            if (!$user) {
                return response()->json([
                    'status' => 401,
                    'message' => 'Unauthenticated'
                ]);
            }

            $action = '';
            $isLiked = VideoLiked::where('user_id', $user->id)->where('video_id', $id)->first();

            if (!$isLiked) {
                $action = 'like';
                VideoLiked::create([
                    'user_id' => $user->id,
                    'video_id' => $id
                ]);
            } else {
                $action = 'unlike';
                $isLiked->delete();
            }

            return response()->json([
                'status' => 200,
                'action' => $action,
            ]);

        } catch (Exception $e) {
            return response()->json([
                'status' => 500,
                'message' => $e->getMessage()
            ]);
        }
    }

    public function submitComment(Request $request)
    {
        try {
            $content = $request->content;
            $videoID = $request->videoID;
            $user = $request->user();

            $newComment = Comment::create([
                'user_id' => $user->id,
                'video_id' => $videoID,
                'content' => $content,
                'post_date' => Carbon::now()
            ]);

            return response()->json([
                'status' => 200,
                'data' => $newComment
            ]);
        } catch (Exception $e) {
            return response($e->getMessage(), 500);
        }
    }

    public function deleteComment($id)
    {
        try {
            $comment = Comment::find($id);

            if (!$comment) {
                return response()->json([
                    'status' => 400,
                    'message' => 'comment not found'
                ]);
            }

            $comment->delete();

            return response()->json([
                'status' => 200,
                'message' => 'delete comment successful'
            ]);
        } catch (Exception $e) {
            return response($e->getMessage(), 500);
        }
    }
}