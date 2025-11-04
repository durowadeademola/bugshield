<?php

namespace App\Http\Controllers;

use App\Models\Analyst;
use App\Models\Organization;
use App\Models\Researcher;
use App\Models\Team;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Response;

abstract class Controller
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public static function getJSONResponse($status, $message, $response, $status_code)
    {
        return response()->json([
            'status' => "{$status}",
            'message' => "{$message}",
            'response' => $response,
        ], $status_code);
    }

    public static function getRandomDigits($digits)
    {
        return str_pad(rand(0, pow(10, $digits) - 1), $digits, '0', STR_PAD_LEFT);
    }

    public static function getRandomString($valid_chars, $length)
    {
        $random_string = '';

        $num_valid_chars = strlen($valid_chars);

        for ($i = 0; $i < $length; $i++) {
            $random_pick = mt_rand(1, $num_valid_chars);

            $random_char = $valid_chars[$random_pick - 1];

            $random_string .= $random_char;
        }

        return $random_string;
    }

    public static function generateRandomCode($length = 5)
    {

        $valid_chars = 'ABCDEFGHIJKLMNPQRSTUVWXYZ123456789';

        return self::getRandomString($valid_chars, $length);
    }

    public function getResponse($result, $message)
    {
        return Response::json(self::makeResponse($message, $result));
    }

    public function getError($error, $code = 404)
    {
        return Response::json(self::makeError($error), $code);
    }

    public function getSuccess($message)
    {
        return Response::json([
            'success' => true,
            'message' => $message,
        ], 200);
    }

    public static function setResponse($message, $data)
    {
        return [
            'success' => true,
            'data' => $data,
            'message' => $message,
        ];
    }

    public static function setError($message, array $data = [])
    {
        $res = [
            'success' => false,
            'message' => $message,
        ];

        if (! empty($data)) {
            $res['data'] = $data;
        }

        return $res;
    }

    public static function getStatesList()
    {
        return [
            'Abia', 'Abuja (Federal Capital Territory)', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi',
            'Bayelsa', 'Benue', 'Borno', 'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu',
            'Gombe', 'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos',
            'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers', 'Sokoto', 'Taraba',
            'Yobe', 'Zamfara',
        ];
    }

    public static function getMonthsList()
    {
        return [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December',
        ];
    }

    public static function getDaysList()
    {
        return [
            'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday',
            'Saturday', 'Sunday',
        ];
    }

    public function redirectToRouteBasedOnRole($user): string
    {
        $routesMap = [
            'organization' => 'organization.dashboard',
            'researcher' => 'researcher.dashboard',
            'analyst' => 'analyst.dashboard',
            'team' => 'team.dashboard',
        ];

        foreach ($routesMap as $role => $route) {
            if ($user->hasRole($role)) {
                return route($route, absolute: false);
            }
        }

        // Fallback route
        return route('home', absolute: false);
    }

    public function invalidateBasedOnRole($user): void
    {
        $rolesMap = [
            'organization' => Organization::class,
            'researcher' => Researcher::class,
            'analyst' => Analyst::class,
            'team' => Team::class,
        ];

        foreach ($rolesMap as $role => $model) {
            if ($user->hasRole($role)) {
                $query = $model::where('user_id', $user?->id)->first();

                if ($query) {
                    $query->update(['is_active' => false]);
                    $query->delete();
                }

                break;
            }
        }
    }

    public function updateBasedOnRole($user): void
    {
        $rolesMap = [
            'organization' => Organization::class,
            'analyst' => Analyst::class,
            'researcher' => Researcher::class,
            'team' => Team::class,
        ];

        foreach ($rolesMap as $role => $model) {
            if ($user->hasRole($role)) {
                $query = $model::where('user_id', $user?->id)->first();

                if ($query) {
                    $query->update(['is_active' => true]);
                }

                break;
            }
        }
    }
}
