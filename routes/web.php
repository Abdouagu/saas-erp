<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\SuperAdmin\DashboardController as SuperAdminDashboard;
use App\Http\Controllers\SuperAdmin\VendorController;
use App\Http\Controllers\SuperAdmin\SubscriptionController;
use App\Http\Controllers\Vendor\DashboardController as VendorDashboard;
use App\Http\Controllers\Vendor\ProductController;
use App\Http\Controllers\Vendor\BarcodeController;
use App\Http\Controllers\Vendor\SaleController;
use App\Http\Controllers\Vendor\ClientController;
use App\Http\Controllers\Vendor\PaymentController;
use App\Http\Controllers\Vendor\StatsController;
use Illuminate\Support\Facades\Route;

// Auth
Route::get('/login', [LoginController::class, 'showForm'])->name('login');
Route::post('/login', [LoginController::class, 'login']);
Route::post('/logout', [LoginController::class, 'logout'])->name('logout');

// Subscription expired page
Route::get('/subscription/expired', function () {
    return view('vendor.subscription-expired');
})->name('subscription.expired')->middleware('auth');

// Public barcode lookup
Route::get('/barcode/{code}', [BarcodeController::class, 'showProduct'])->name('barcode.public');

// Super Admin routes
Route::prefix('superadmin')->name('superadmin.')->middleware(['auth', 'isSuperAdmin'])->group(function () {
    Route::get('/dashboard', SuperAdminDashboard::class)->name('dashboard');

    Route::get('/vendors', [VendorController::class, 'index'])->name('vendors.index');
    Route::get('/vendors/create', [VendorController::class, 'create'])->name('vendors.create');
    Route::post('/vendors', [VendorController::class, 'store'])->name('vendors.store');
    Route::get('/vendors/{vendor}/edit', [VendorController::class, 'edit'])->name('vendors.edit');
    Route::put('/vendors/{vendor}', [VendorController::class, 'update'])->name('vendors.update');
    Route::delete('/vendors/{vendor}', [VendorController::class, 'destroy'])->name('vendors.destroy');
    Route::post('/vendors/{vendor}/toggle', [VendorController::class, 'toggleBlock'])->name('vendors.toggle');

    Route::get('/subscriptions', [SubscriptionController::class, 'index'])->name('subscriptions.index');
    Route::post('/subscriptions', [SubscriptionController::class, 'store'])->name('subscriptions.store');
});

// Vendor routes
Route::middleware(['auth', 'isVendor', 'checkSubscription'])->group(function () {
    Route::get('/dashboard', VendorDashboard::class)->name('vendor.dashboard');

    // Products
    Route::get('/products', [ProductController::class, 'index'])->name('vendor.products.index');
    Route::get('/products/create', [ProductController::class, 'create'])->name('vendor.products.create');
    Route::post('/products', [ProductController::class, 'store'])->name('vendor.products.store');
    Route::get('/products/{product}', [ProductController::class, 'show'])->name('vendor.products.show');
    Route::get('/products/{product}/edit', [ProductController::class, 'edit'])->name('vendor.products.edit');
    Route::put('/products/{product}', [ProductController::class, 'update'])->name('vendor.products.update');
    Route::delete('/products/{product}', [ProductController::class, 'destroy'])->name('vendor.products.destroy');
    Route::get('/products/{product}/barcode/pdf', [BarcodeController::class, 'downloadPDF'])->name('vendor.barcode.pdf');

    // Barcode scan
    Route::get('/scan', [BarcodeController::class, 'scanPage'])->name('vendor.scan');

    // Sales
    Route::get('/sales', [SaleController::class, 'index'])->name('vendor.sales.index');
    Route::get('/sales/create', [SaleController::class, 'create'])->name('vendor.sales.create');
    Route::post('/sales', [SaleController::class, 'store'])->name('vendor.sales.store');
    Route::get('/sales/{sale}', [SaleController::class, 'show'])->name('vendor.sales.show');
    Route::get('/sales/{sale}/invoice/pdf', [SaleController::class, 'downloadInvoice'])->name('vendor.sales.invoice');

    // Clients
    Route::get('/clients', [ClientController::class, 'index'])->name('vendor.clients.index');
    Route::post('/clients', [ClientController::class, 'store'])->name('vendor.clients.store');
    Route::get('/clients/{client}', [ClientController::class, 'show'])->name('vendor.clients.show');

    // Payments
    Route::get('/payments', [PaymentController::class, 'index'])->name('vendor.payments.index');
    Route::post('/payments', [PaymentController::class, 'store'])->name('vendor.payments.store');

    // Stats
    Route::get('/stats', [StatsController::class, 'index'])->name('vendor.stats.index');
});

Route::get('/', function () {
    return redirect()->route('login');
});
