<?php

namespace App\Http\Controllers;

use Response;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

abstract class Controller
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public static function createJSONResponse($status,$message,$response,$status_code)
    {
        return response()->json([
            'status'=>"{$status}",
            'message'=>"{$message}",
            'response'=>$response
        ],$status_code);
    }

    public static function getRandomDigits($digits){
        return str_pad(rand(0, pow(10, $digits)-1), $digits, '0', STR_PAD_LEFT);
    }

    
    public static function getRandomString($valid_chars, $length){
        $random_string = "";

        $num_valid_chars = strlen($valid_chars);

        for ($i = 0; $i < $length; $i++){
            $random_pick = mt_rand(1, $num_valid_chars);

            $random_char = $valid_chars[$random_pick-1];

            $random_string .= $random_char;
        }
        return $random_string;
    }

    public static function generateRandomCode($length=5){

        $valid_chars = "ABCDEFGHIJKLMNPQRSTUVWXYZ123456789";
        return self::getRandomString($valid_chars, $length);
    }


    public function sendResponse($result, $message)
    {
        return Response::json(self::makeResponse($message, $result));
    }


    public function sendError($error, $code = 404)
    {
        return Response::json(self::makeError($error), $code);
    }

    
    public function sendSuccess($message)
    {
        return Response::json([
            'success' => true,
            'message' => $message
        ], 200);
    }

    public static function makeResponse($message, $data)
    {
        return [
            'success' => true,
            'data'    => $data,
            'message' => $message,
        ];
    }

    public static function makeError($message, array $data = [])
    {
        $res = [
            'success' => false,
            'message' => $message,
        ];

        if (!empty($data)) {
            $res['data'] = $data;
        }

        return $res;
    }

    public static function statesList()
    {
        return [
            "Abuja FCT", "Anambra", "Enugu", "Akwa Ibom", "Adamawa", "Abia", "Bauchi","Bayelsa",
            "Benue", "Borno", "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Gombe", "Imo",
            "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", "Kwara", "Lagos", "Nasarawa",
            "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba",
            "Yobe", "Zamfara"
        ];
    }

    public static function monthsList()
    {
        return [
          "January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"
        ];
    }

    public static function daysList()
    {
        return [
            "Monday", "Tuesday", "Wednesday", "Thursday", "Friday",
            "Saturday", "Sunday"
        ];
    }

}