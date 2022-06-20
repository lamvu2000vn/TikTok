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
        Schema::table('notifications', function(Blueprint $table) {
            $table->foreign('type_id')->references('id')->on('notification_types');
            $table->foreign('user_id')->references('id')->on('users');
        });

        Schema::table('following', function(Blueprint $table) {
            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('following_id')->references('id')->on('users');
        });

        Schema::table('followers', function(Blueprint $table) {
            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('follower_id')->references('id')->on('users');
        });

        Schema::table('videos_liked', function(Blueprint $table) {
            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('video_id')->references('id')->on('videos');
        });

        Schema::table('comments', function(Blueprint $table) {
            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('video_id')->references('id')->on('videos');
        });

        Schema::table('comments_liked', function(Blueprint $table) {
            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('comment_id')->references('id')->on('comments');
        });

        Schema::table('replies', function(Blueprint $table) {
            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('comment_id')->references('id')->on('comments');
        });

        Schema::table('videos', function(Blueprint $table) {
            $table->foreign('user_id')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
};
