<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Bugshield Two Factor</title>
</head>
<body>
    <h2>Hello,</h2>

    <p>Your Two-Factor Authentication code is:</p>

    <h1 style="color: #4f46e5;">{{ $user->two_factor_code }}</h1>

    <p>This code will expire in 10 minutes.</p>

    <p>If you did not request this, please secure your account immediately.</p>

    <br>
    <p>— BugShield Security Team</p>
</body>
</html>
