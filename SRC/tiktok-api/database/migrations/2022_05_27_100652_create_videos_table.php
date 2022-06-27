<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('videos', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->string('filename', 200)->comment('Tên hình');
            $table->float('duration')->default(0)->comment('Độ dài video');
            $table->text('description')->nullable();
            $table->boolean('allow_comments')->comment('0: Không có phép bình luận, 1: Cho phép bình luận');
            $table->datetime('post_date');
            $table->boolean('status');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('videos');
    }
};
