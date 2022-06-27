<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Exception;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class AuthController extends Controller
{
    public function __construct()
    {
     
    }

    public function login(Request $request)
    {
        try {
            $phone = $request->phone;
            $password = $request->password;

            $user = User::where('phone', $phone)->first();

            if (!$user) {
                return response()->json([
                    'status' => 401,
                    'message' => 'Unauthenticated'
                ]);
            }

            if (!Hash::check($password, $user->password)) {
                return response()->json([
                    'status' => 401,
                    'message' => 'Unauthenticated'
                ]);
            }

            Auth::login($user, true);

            $request->session()->regenerate();

            return response()->json([
                'status' => 200,
                'data' => User::getUserInfo($user->id),
                'message' => 'Authenticated'
            ]);

        } catch (Exception $e) {
            return response()->json([
                'status' => 500,
                'message' => $e->getMessage(),
            ]);
        }
    }

    public function logout(Request $request)
    {
        try {
            $request->session()->invalidate();
            Auth::logout();

            return response()->json([
                'status' => 200,
                'message' => 'logout successful'
            ]);
        } catch (Exception $e) {
            return response()->json([
                'status' => 500,
                'message' => $e->getMessage()
            ]);
        }
    }

    public function checkLogin(Request $request)
    {
        try {
            $user = $request->user();

            if ($user) {
                $user = User::getUserInfo($user->id);

                return response()->json([
                    'status' => 200,
                    'message' => 'Authenticated',
                    'user' => $user
                ]);
            } else {
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
}
