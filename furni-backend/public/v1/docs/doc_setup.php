<?php

/**
 * @OA\Info(
 *   title="API",
 *   description="Web programming",
 *   version="1.0",
 *   @OA\Contact(
 *     email="emina.omercevic@ibu.edu.ba",
 *     name="Emina Omercevic"
 *   )
 * ),
 * @OA\OpenApi(
 *   @OA\Server(
 *       url=BASE_URL
 *   )
 * )
 * @OA\SecurityScheme(
 *     securityScheme="ApiKey",
 *     type="apiKey",
 *     in="header",
 *     name="Authentication"
 * )
 */
