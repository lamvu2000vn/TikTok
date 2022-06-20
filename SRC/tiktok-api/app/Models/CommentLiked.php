<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CommentLiked extends Model
{
    use HasFactory;

    protected $table = 'comments_liked';

    public $timestamps = false;

    public $fillable = [
        'user_id',
        'comment_id'
    ];
}
