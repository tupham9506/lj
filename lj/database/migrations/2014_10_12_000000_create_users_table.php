<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
      // php artisan passport:client --personal
      Schema::create('users', function (Blueprint $table) {
          $table->bigIncrements('id');
          $table->string('account')->unique();
          $table->string('password');
          $table->string('name');
          $table->integer('dob_year')->nullable();
          $table->integer('dob_month')->nullable();
          $table->integer('dob_day')->nullable();
          $table->integer('lifespan')->default(80);
          $table->string('avatar', 1000)->nullable();
          $table->boolean('is_absolute_avatar')->default(0);
          $table->boolean('status')->default(1);
          $table->rememberToken();
          $table->timestamps();
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
}
