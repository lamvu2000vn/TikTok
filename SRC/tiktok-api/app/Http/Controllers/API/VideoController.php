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
            $videos = Video::limit($limit)->offset($offset)->get();
    
            foreach ($videos as $video) {
                $user = $video->user;
                $video->likes = Video::getNumberOfLikes($video->id);
                $video->comments = Video::getNumberOfComments($video->id);
                $video->user = User::getUserInfo($user);
            }
    
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
            $limit = $request->limit;
            $offset = $request->offset;
            $user = $request->user();

            if (!$user) {
                return response()->json([
                    'status' => 401,
                    'message' => 'Unauthenticated'
                ]);
            }

            $followingIds = Following::where('user_id', $user->id)
                                        ->select('following_id')
                                        ->pluck('following_id');

            $videos = Video::whereIn('user_id', $followingIds)
                            ->limit($limit)
                            ->offset($offset)
                            ->get();

            foreach ($videos as $video) {
                $user = $video->user;
                $video->likes = Video::getNumberOfLikes($video->id);
                $video->comments = Video::getNumberOfComments($video->id);
                $video->user = User::getUserInfo($user);
            }
    
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
}