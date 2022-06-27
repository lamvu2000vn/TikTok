<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Exception;
use Illuminate\Support\Facades\DB;
use App\Models\Following;
use App\Models\User;
use App\Models\Video;

class UserController extends Controller
{
    public function __construct()
    {
    }

    public function getRecommendedUsers()
    {
        try {
            $userIds = User::where('verified', 1)->limit(30)->select('id')->get()->pluck('id')->toArray();
            $users = User::getUserInfo($userIds);
    
            return response()->json([
                'status' => 200,
                'data' => $users
            ]);
        } catch (Exception $e) {
            return response()->json([
                'status' => 500,
                'message' => $e->getMessage()
            ]);
        }
    }

    public function getFollowingUsers(Request $request)
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
                                        ->limit($limit)
                                        ->offset($offset)
                                        ->get()
                                        ->pluck('following_id')
                                        ->toArray();

            $users = User::getUserInfo($followingIds);
    
            return response()->json([
                'status' => 200,
                'data' => $users
            ]);
        } catch (Exception $e) { 
            return response()->json([
                'status' => 200,
                'message' => $e->getMessage()
            ]);
        }
    }

    public function followUser(Request $request, $id)
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
            $isFollowing = Following::where('user_id', $user->id)->where('following_id', $id)->first();

            if ($isFollowing) {
                $action = 'unfollow';
                $isFollowing->delete();
            } else {
                $action = 'follow';
                Following::create([
                    'user_id' => $user->id,
                    'following_id' => $id
                ]);
            }

            return response()->json([
                'status' => 200,
                'action' => $action
            ]);
        }
        catch (Exception $e) {
            return response()->json([
                'status' => 500,
                'message' => $e->getMessage(),
            ]);
        }
    }
    
    public function getOrtherInfomation(Request $request, $id)
    {
        try {
            $user = $request->user();

            if (!$user) {
                return response()->json([
                    'status' => 401,
                    'message' => 'Unauthenticated'
                ]);
            }


        } catch (Exception $e) {
            return response()->json([
                'status' => 500,
                'message' => $e->getMessage()
            ]);
        }
    }

    public function getUserByNickname($nickname)
    {
        try {
            $user = User::where('nickname', $nickname)->first();
            $user = User::getUserInfo($user);

            return response()->json([
                'status' => 200,
                'data' => $user
            ]);

        } catch (Exception $e) {
            return response()->json([
                'status' => 500,
                'message' => $e->getMessage()
            ]);
        }
    }

    public function getVideosOfuser(Request $request, $userIdentify)
    {
        try {
            $limit = $request->limit;
            $offset = $request->offset;

            $videos = Video::getVideosOfUser($userIdentify, $limit, $offset);

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
}
