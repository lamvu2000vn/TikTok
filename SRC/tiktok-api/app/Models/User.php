<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\DB;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Support\Facades\Auth;

use App\Models\Following;
use App\Models\CommentLiked;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'phone',
        'password',
        'nickname',
        'name',
        'description',
        'avatar',
        'verified',
        'status'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    // Relationship
    public function notifications()
    {
        return $this->hasMany(Notification::class);
    }

    public function followers()
    {
        return $this->hasMany(Follower::class);
    }

    public function following()
    {
        return $this->hasMany(Following::class);
    }

    public function videos()
    {
        return $this->hasMany(Video::class);
    }

    public function videosLiked()
    {
        return $this->belongsToMany(Video::class, 'videos_liked', 'user_id', 'video_id');
    }

    public function comments()
    {
        return $this->belongsToMany(Video::class, 'comments', 'user_id', 'video_id')->withPivot('id', 'content', 'post_date');
    }

    public function commentsLiked()
    {
        return $this->belongsToMany(Comment::class, 'comments_liked', 'user_id', 'comment_id');
    }

    public function replies()
    {
        return $this->belongsToMany(Comment::class, 'replies', 'user_id', 'comment_id')->withPivot('id', 'content', 'post_date');
    }

    // Functions
    public static function getUserInfo($user)
    {

        $user->followers = self::getNumberOfFollower($user->id);
        $user->following = self::getNumberOfFollowing($user->id);
        $user->likes = self::getTotalLike($user->id);
        $user->isFollowing = self::checkIsFollowing($user->id);

        return $user;
    }

    public static function getNumberOfFollower($user_id)
    {
        return DB::table('followers')->where('user_id', $user_id)->count();
    }

    public static function getFollowers($user_id)
    {
        return DB::table('followers')->where('user_id', $user_id)->get();
    }

    public static function getNumberOfFollowing($user_id)
    {
        return DB::table('following')->where('user_id', $user_id)->count();
    }

    public static function getFollowing($user_id)
    {
        return DB::table('following')->where('user_id', $user_id)->get();
    }

    public static function getTotalLike($user_id)
    {
        $videoIds = DB::table('videos')->where('user_id', $user_id)->get()->pluck('id');

        $totalLike = DB::table('videos_liked')->whereIn('video_id', $videoIds)->count();

        return $totalLike;
    }

    // Kiểm tra người dùng đang đăng nhập hiện tại có đang theo dõi tài khoản khác theo id không
    public static function checkIsFollowing($following_id)
    {
        $user = Auth::user();

        if ($user) {
            $isFollowing = Following::where('user_id', $user->id)->where('following_id', $following_id)->first();
            return  $isFollowing ? true : false;
        }

        return false;
    }

    public static function checkLikedComment($comment_id)
    {
        $user = Auth::user();

        if ($user) {
            $isLiked = CommentLiked::where('user_id', $user->id)->where('comment_id', $comment_id)->first();

            return $isLiked ? true : false;
        }

        return false;
    }
}
