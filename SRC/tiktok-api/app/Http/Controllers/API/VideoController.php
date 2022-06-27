<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Exception;
use App\helpers\VideoStream;
use Illuminate\Support\Facades\DB;

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

            $videos = Video::getVideoByIds($videoIds);
    
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

            $user = $request->user();

            $commentsList = Comment::where('video_id', $id)->limit($limit)->offset($offset)->get();

            foreach ($commentsList as $comment) {
                $user = User::find($comment->user_id);
                $comment->user = User::getUserInfo($user);
                $comment->likes = CommentLiked::where('comment_id', $comment->id)->where('user_id', $user->id)->count();
                $comment->isLiked = User::checkLikedComment($comment->id);
            }

            return response()->json([
                'status' => 200,
                'data' => $commentsList
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
}