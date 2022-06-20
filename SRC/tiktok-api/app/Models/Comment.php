<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory;

    protected $table = 'comments';

    public $timestamps = false;

    public $fillable = [
        'user_id',
        'video_id',
        'content',
        'post_date'
    ];
}
