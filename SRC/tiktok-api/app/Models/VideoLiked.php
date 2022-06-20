<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VideoLiked extends Model
{
    use HasFactory;

    protected $table = 'videos_liked';

    public $timestamps = false;

    public $fillable = [
        'user_id',
        'video_id'
    ];
}
