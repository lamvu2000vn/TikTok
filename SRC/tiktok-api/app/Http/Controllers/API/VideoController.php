<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use App\Models\Video;
use Exception;
use App\helpers\VideoStream;

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

    public function streamVideo($filename)
    {
        $path = public_path("videos/$filename");
        $stream = new VideoStream($path);
        $stream->start();
    }
}