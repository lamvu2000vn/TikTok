<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    use HasFactory;

    protected $table = 'notifications';

    public $timestamps = false;

    public $fillable = [
        'type_id',
        'user_id',
        'content',
        'send_date',
        'read'
    ];

    public function type()
    {
        return $this->belongsTo(NotificationType::class, 'type_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
