<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class Video extends Model
{
    use HasFactory;

    protected $table = 'videos';

    public $timestamps = false;

    public $fillable = [
        'user_id',
        'filename',
        'duration',
        'description',
        'allow_comments',
        'post_date',
        'status'
    ];

    // Relationship
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function liked()
    {
        return $this->belongsToMany(User::class, 'videos_liked', 'video_id', 'user_id');
    }

    public function comments()
    {
        return $this->belongsToMany(User::class, 'comments', 'video_id', 'user_id')->withPivot('id', 'content', 'post_date');
    }

    // Functions
    public static function getVideoByIds($ids)
    {
        $stringIds = '(' . implode(', ', $ids) . ')';
        $userId = Auth::id() ?? 0;

        $videos = DB::select("
            SELECT
                videos.*,
                (SELECT COUNT(*) FROM videos_liked WHERE videos_liked.video_id = videos.id) AS video_likes,
                (SELECT COUNT(*) FROM comments WHERE comments.video_id = videos.id) AS comments,
                users.nickname,
                users.name,
                users.description AS user_description,
                users.avatar,
                users.verified,
                (SELECT COUNT(*) FROM following WHERE following.user_id = videos.user_id) AS following,
                (SELECT COUNT(*) FROM followers WHERE followers.user_id = videos.user_id) AS followers,
                (
                    SELECT COUNT(*)
                    FROM videos_liked
                    WHERE videos_liked.video_id IN (
                        SELECT videos.id
                        FROM videos
                        WHERE videos.user_id = users.id
                    )
                ) AS user_likes,
                (SELECT COUNT(*) FROM following WHERE following.user_id = $userId AND following.following_id = videos.user_id) AS is_following,
                (SELECT COUNT(*) FROM videos_liked WHERE videos_liked.user_id = $userId AND videos_liked.video_id = videos.id) AS is_liked
            FROM videos
            LEFT JOIN users ON videos.user_id = users.id
            WHERE videos.id IN $stringIds
        ");

        $result = [];
        foreach ($videos as $row) {
            $result[] = [
                'video' => [
                    'id' => $row->id,
                    'user_id' => $row->user_id,
                    'filename' => $row->filename,
                    'duration' => $row->duration,
                    'description' => $row->description,
                    'allow_comments' => $row->allow_comments,
                    'post_date' => $row->post_date,
                    'status' => $row->status,
                    'likes' => $row->video_likes,
                    'comments' => $row->comments,
                    'is_liked' => $row->is_liked,
                ],
                'user' => [
                    'id' => $row->user_id,
                    'nickname' => $row->nickname,
                    'name' => $row->name,
                    'description' => $row->user_description,
                    'avatar' => $row->avatar,
                    'verified' => $row->verified,
                    'following' => $row->following,
                    'followers' => $row->followers,
                    'likes' => $row->user_likes,
                    'is_following' => $row->is_following,
                ]
            ];
        }

        return $result;
    }

    public static function getVideosOfUser($userIdentify, $limit, $offset)
    {
        $videos = Video::where('user_id', is_numeric($userIdentify) ? $userIdentify : User::where('nickname', $userIdentify)->first()->id)
                            ->limit($limit)
                            ->offset($offset)
                            ->orderBy('date_post', 'desc')
                            ->get();

        return $videos;
    }

    public static function getNumberOfComments($video_id)
    {
        return DB::table('comments')->where('video_id', $video_id)->count();
    }

    public static function getNumberOfLikes($video_id)
    {
        return DB::table('videos_liked')->where('video_id', $video_id)->count();
    }
}
