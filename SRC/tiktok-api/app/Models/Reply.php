<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reply extends Model
{
    use HasFactory;

    protected $table = 'replies';

    public $timestamps = false;

    public $fillable = [
        'user_id',
        'comment_id',
        'content',
        'post_date'
    ];
}
