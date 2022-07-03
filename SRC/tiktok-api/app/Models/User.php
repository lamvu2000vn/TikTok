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
    public static function getUserInfo($userIdentify)
    {
        $loginUserId = Auth::id() ?? 0;

        $query = "
            SELECT
                users.id,
                users.phone,
                users.nickname,
                users.name,
                users.description,
                users.avatar,
                users.verified,
                users.status,
                (SELECT COUNT(*) FROM following WHERE following.user_id = users.id) AS following,
                (SELECT COUNT(*) FROM followers WHERE followers.user_id = users.id) AS followers,
                (
                    SELECT COUNT(*)
                    FROM videos_liked
                    WHERE videos_liked.video_id IN (
                        SELECT videos.id
                        FROM videos
                        WHERE videos.user_id = users.id
                    )
                ) AS likes,
                (SELECT COUNT(*) FROM following WHERE following.user_id = $loginUserId AND following.following_id = users.id) AS is_following
            FROM users
        ";

        $type = gettype($userIdentify);
        $whereClause = '';

        switch ($type) {
            case 'integer':
                $whereClause = "WHERE users.id = $userIdentify";
                break;
            case 'array':
                $stringUserIds = '(' . implode(', ', $userIdentify) . ')';
                $whereClause ="WHERE users.id IN $stringUserIds";
                break;
            default:
                return false;
        }

        $query .= $whereClause;
        $result = DB::select($query);

        return $result;
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
