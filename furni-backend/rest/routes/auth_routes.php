<?php

require_once __DIR__ . '/../services/AuthService.class.php';

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

Flight::set('auth_service', new AuthService());


    
    /**
     * @OA\Post(
     *      path="/auth/login",
     *      tags={"auth"},
     *      summary="Login to system using email and password",
     *      @OA\Response(
     *           response=200,
     *           description="User data and JWT"
     *      ),
     *      @OA\RequestBody(
     *          description="Credentials",
     *          @OA\JsonContent(
     *              required={"email","password"},
     *              @OA\Property(property="email", type="string", example="example@example.com", description="User email address"),
     *              @OA\Property(property="password", type="string", example="some_password", description="User password")
     *          )
     *      )
     * )
     */
    Flight::route('POST /auth/login', function() {
        $payload = Flight::request()->data->getData();

        $user = Flight::get('auth_service')->get_user_by_email($payload['email']);
    

    if(!$user || !password_verify($payload['password'], $user['password']))
            Flight::halt(500, "Invalid username or password");
        unset($user['password']);
        
        $jwt_payload = [
            'user' => $user,
            'iat' => time(),
            // If this parameter is not set, JWT will be valid for life. This is not a good approach
            'exp' => time() + (60 * 60 * 24) // valid for day
        ];

        $token = JWT::encode(
            $jwt_payload,
            Config::JWT_SECRET(),
            'HS256'
        );

        Flight::json(
            array_merge($user, ['token' => $token])
        );
});
/**
 * @OA\Post(
 *      path="/auth/logout",
 *      tags={"auth"},
 *      summary="Logout user",
 *      @OA\Response(
 *           response=200,
 *           description="Logout successful"
 *      )
 * )
 */

 Flight::route('POST /auth/logout', function() {
    try {
        $token = Flight::request()->getHeader("Authorization");

        if (!$token) {
            Flight::halt(401, "Missing authentication header");
        }

        // Remove 'Bearer ' prefix from token
        if (strpos($token, 'Bearer ') === 0) {
            $token = substr($token, 7);
        }

        $decoded_token = JWT::decode($token, new Key(Config::JWT_SECRET(), 'HS256'));

        Flight::json([
            'jwt_decoded' => $decoded_token,
            'user' => $decoded_token->user
        ]);
    } catch (\Exception $e) {
        Flight::halt(401, $e->getMessage());
    }
});