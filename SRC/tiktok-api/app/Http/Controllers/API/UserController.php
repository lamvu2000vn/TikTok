<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Exception;
use App\Models\Following;
use App\Models\User;
use App\Models\Video;

class UserController extends Controller
{
    public function __construct()
    {
    }

    public function recommendedUsers()
    {
        try {
            $users = User::where('verified', 1)->limit(30)->get();

            foreach ($users as $user) {
                $user = User::getUserInfo($user);
                $user->video = Video::where('user_id', $user->id)->inRandomOrder()->first();
            }
    
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

    public function followingUsers(Request $request)
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
                                        ->pluck('following_id');
                                        
            $usersFollowing = User::whereIn('id', $followingIds)->get();

            foreach ($usersFollowing as $user) {
                $user = User::getUserInfo($user);
            }
    
            return response()->json([
                'status' => 200,
                'data' => $usersFollowing
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
}
