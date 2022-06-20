<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Video extends Model
{
    use HasFactory;

    protected $table = 'videos';

    public $timestamps = false;

    public $fillable = [
        'user_id',
        'name',
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
    public static function getNumberOfComments($video_id)
    {
        return DB::table('comments')->where('video_id', $video_id)->count();
    }

    public static function getNumberOfLikes($video_id)
    {
        return DB::table('videos_liked')->where('video_id', $video_id)->count();
    }
}
