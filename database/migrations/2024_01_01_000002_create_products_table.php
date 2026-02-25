<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->foreignId('vendor_id')->constrained('users')->onDelete('cascade');
            $table->enum('category', ['phone', 'pc']);
            $table->string('name');
            $table->string('serial_number')->nullable();
            $table->tinyInteger('battery_percentage')->nullable();
            $table->string('storage')->nullable();
            $table->string('color')->nullable();
            $table->enum('condition', ['new', 'used'])->default('new');
            $table->decimal('purchase_price', 10, 2)->default(0);
            $table->decimal('selling_price', 10, 2)->default(0);
            $table->string('photo')->nullable();
            $table->string('barcode')->nullable()->unique();
            $table->string('internal_code')->nullable()->unique();
            $table->enum('status', ['available', 'sold'])->default('available');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
