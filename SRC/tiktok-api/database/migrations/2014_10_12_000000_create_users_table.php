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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('phone', 20);
            $table->string('password');
            $table->string('nickname', 50)->comment('Nick name');
            $table->string('name', 100)->comment('Tên người dùng');
            $table->string('description', 200)->nullable()->comment('Tiểu sử');
            $table->string('avatar', 500)->comment('Tên file hình');
            $table->boolean('verified')->default(0)->comment('0: Chưa xác thực, 1: Đã xác thực');
            $table->boolean('status')->default(1);
            $table->rememberToken();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
};
