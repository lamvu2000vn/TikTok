<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $comments = [];
        for ($i = 0; $i < 1000; $i++) {
            $comments[] = [
                'user_id' => mt_rand(2, 51),
                'video_id' => 1,
                'content' => Str::random(100),
                'post_date' => date('Y-m-d H:i:s')
            ];
        }
        DB::table('comments')->insert($comments);

        $commentLikes = [];
        for ($i = 0; $i < 1000; $i++) {
            $commentLikes[] = [
                'user_id' => mt_rand(2, 51),
                'comment_id' => mt_rand(1, 1000)
            ];
        }
        DB::table('comments_liked')->insert($commentLikes);

        // DB::table('comments')->insert($comments);
        // \App\Models\User::factory(10)->create();
        // DB::table('users')->insert([
        //     [
        //         'phone' => '0779792000',
        //         'password' => Hash::make('123456'),
        //         'nickname' => 'vhl970',
        //         'name' => 'Vũ Hoàng Lâm',
        //         'avatar' => 'default-avatar.png'
        //     ],
        //     [
        //         'phone' => '0999999999',
        //         'password' => Hash::make('123456'),
        //         'nickname' => 'toktok',
        //         'name' => 'TikTok',
        //         'avatar' => 'default-avatar.png'
        //     ],
        // ]);

        // DB::table('videos')->insert([
        //     [
        //         'user_id' => 2,
        //         'name' => 'video-1.mp4',
        //         'duration' => 10.959,
        //         'description' => 'this is video 1 description!',
        //         'allow_comments' => 1,
        //         'post_date' => date('Y-m-d H:i:s'),
        //         'status' => 1,
        //     ],
        //     [
        //         'user_id' => 2,
        //         'name' => 'video-2.mp4',
        //         'duration' => 17.251,
        //         'description' => 'this is video 1 description!',
        //         'allow_comments' => 1,
        //         'post_date' => date('Y-m-d H:i:s'),
        //         'status' => 1,
        //     ],
        //     [
        //         'user_id' => 2,
        //         'name' => 'video-3.mp4',
        //         'duration' => 19.109,
        //         'description' => 'this is video 3 description!',
        //         'allow_comments' => 1,
        //         'post_date' => date('Y-m-d H:i:s'),
        //         'status' => 1,
        //     ],
        //     [
        //         'user_id' => 2,
        //         'name' => 'video-4.mp4',
        //         'duration' => 33.296,
        //         'description' => 'this is video 4 description!',
        //         'allow_comments' => 1,
        //         'post_date' => date('Y-m-d H:i:s'),
        //         'status' => 1,
        //     ],
        //     [
        //         'user_id' => 2,
        //         'name' => 'video-5.mp4',
        //         'duration' => 29.721,
        //         'description' => 'this is video 5 description!',
        //         'allow_comments' => 1,
        //         'post_date' => date('Y-m-d H:i:s'),
        //         'status' => 1,
        //     ],
        //     [
        //         'user_id' => 2,
        //         'name' => 'video-6.mp4',
        //         'duration' => 13.536,
        //         'description' => 'this is video 6 description!',
        //         'allow_comments' => 1,
        //         'post_date' => date('Y-m-d H:i:s'),
        //         'status' => 1,
        //     ],
        //     [
        //         'user_id' => 2,
        //         'name' => 'video-7.mp4',
        //         'duration' => 8.289,
        //         'description' => 'this is video 7 description!',
        //         'allow_comments' => 1,
        //         'post_date' => date('Y-m-d H:i:s'),
        //         'status' => 1,
        //     ],
        //     [
        //         'user_id' => 2,
        //         'name' => 'video-8.mp4',
        //         'duration' => 10.053,
        //         'description' => 'this is video 8 description!',
        //         'allow_comments' => 1,
        //         'post_date' => date('Y-m-d H:i:s'),
        //         'status' => 1,
        //     ],
        //     [
        //         'user_id' => 2,
        //         'name' => 'video-9.mp4',
        //         'duration' => 12.584,
        //         'description' => 'this is video 9 description!',
        //         'allow_comments' => 1,
        //         'post_date' => date('Y-m-d H:i:s'),
        //         'status' => 1,
        //     ],
        //     [
        //         'user_id' => 2,
        //         'name' => 'video-10.mp4',
        //         'duration' => 9.659,
        //         'description' => 'this is video 10 description!',
        //         'allow_comments' => 1,
        //         'post_date' => date('Y-m-d H:i:s'),
        //         'status' => 1,
        //     ],
        // ]);
    }
}
