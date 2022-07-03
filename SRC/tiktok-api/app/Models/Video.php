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
    public static function getVideo($videoIdentify)
    {
        $userId = Auth::id() ?? 0;

        $query = "
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
        ";

        $type = gettype($videoIdentify);
        $whereClause = '';

        switch ($type) {
            case 'int':
                $whereClause = "WHERE videos.id = $videoIdentify";
                break;
            case 'array':
                $stringVideoIds = '(' . implode(', ', $videoIdentify) . ')';
                $whereClause = "WHERE videos.id IN $stringVideoIds";
                break;
            default:
                return false;
        }

        $query .= $whereClause;

        $videos = DB::select($query);

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
        $loginUserId = Auth::id() ?? 0;

        $query = "
            SELECT
                users.*,
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
                (SELECT COUNT(*) FROM following WHERE following.user_id = $loginUserId AND following.following_id = users.id) AS is_following,
                videos.id AS video_id,
                videos.filename,
                videos.duration,
                videos.description AS video_description,
                videos.allow_comments,
                videos.post_date,
                videos.status AS video_status,
                (SELECT COUNT(*) FROM videos_liked WHERE videos_liked.video_id = videos.id) AS video_likes,
                (SELECT COUNT(*) FROM comments WHERE comments.video_id = videos.id) AS comments
            FROM users
            LEFT JOIN videos ON users.id = videos.user_id
        ";

        $type = gettype($userIdentify);
        $whereClause = '';

        switch ($type) {
            case 'int':
                $whereClause = "WHERE users.id = $userIdentify";
                break;
            case 'string':
                $whereClause = "WHERE users.nickname = '$userIdentify'";
                break;
            default:
                return false;
        }

        $query .= "
            $whereClause
            ORDER BY videos.post_date DESC
            LIMIT $limit OFFSET $offset
        ";

        $result = DB::select($query);

        $videos = [];
        if (count($result) > 0) {
            foreach ($result as $row) {
                $videos[] = [
                    'user' => [
                        'id' => $row->id,
                        'nickname' => $row->nickname,
                        'name' => $row->name,
                        'description' => $row->description,
                        'avatar' => $row->avatar,
                        'verified' => $row->verified,
                        'status' => $row->status,
                        'following' => $row->following,
                        'followers' => $row->followers,
                        'likes' => $row->likes,
                        'is_following' => $row->is_following
                    ],
                    'video' => $row->video_id ? [
                        'id' => $row->video_id,
                        'filename' => $row->filename,
                        'duration' => $row->duration,
                        'description' => $row->video_description,
                        'allow_comments' => $row->allow_comments,
                        'post_date' => $row->post_date,
                        'status' => $row->video_status,
                        'likes' => $row->video_likes,
                        'comments' => $row->comments
                    ] : null
                ];
            }
        }

        return $videos;
    }

    public static function getCommentsOfVideo($video_id, $limit, $offset)
    {
        $loginUserId = Auth::id() ?? 0;

        $sqlResult = DB::select("
            SELECT
                comments.*,
                (SELECT COUNT(*) FROM comments_liked WHERE comments_liked.comment_id = comments.id) AS comment_likes,
                (SELECT COUNT(*) FROM replies WHERE replies.comment_id = comments.id) AS replies,
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
                ) AS user_likes,
                (SELECT COUNT(*) FROM following WHERE following.user_id = $loginUserId AND following.following_id = users.id) AS is_following,
                (SELECT COUNT(*) FROM comments_liked WHERE comments_liked.user_id = $loginUserId AND comments_liked.comment_id = comments.id) AS is_liked_comment
            FROM comments
            LEFT JOIN users ON comments.user_id = users.id
            WHERE comments.video_id = $video_id
            ORDER BY comments.post_date DESC
            LIMIT $limit OFFSET $offset
        ");

        $commentsList = [];

        if (count($sqlResult) > 0) {
            foreach ($sqlResult as $row) {
                $commentsList[] = [
                    'user' => [
                        'id' => $row->user_id,
                        'nickname' => $row->nickname,
                        'name' => $row->name,
                        'description' => $row->description,
                        'avatar' => $row->avatar,
                        'verified' => $row->verified,
                        'status' => $row->status,
                        'following' => $row->following,
                        'followers' => $row->followers,
                        'likes' => $row->user_likes,
                        'is_following' => $row->is_following,
                        'is_liked_comment' => $row->is_liked_comment,
                    ],
                    'comment' => [
                        'id' => $row->id,
                        'user_id' => $row->user_id,
                        'video_id' => $row->video_id,
                        'content' => $row->content,
                        'post_date' => $row->post_date,
                        'likes' => $row->comment_likes,
                        'replies' => $row->replies
                    ]
                ];
            }
        }

        return $commentsList;
    }
}
