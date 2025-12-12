<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Bluestrike 2FA Code</title>
</head>
<body style="font-family: 'Segoe UI', sans-serif; background-color: #ffffff; padding: 30px; color: #0f172a;">
  <div style="max-width: 600px; margin: auto;">
    {{-- <div style="margin-bottom: 30px;">
      <img src="/images/bluestrike-logo.png" alt="Bluestrike" style="height: 30px;" /> 
      <span class="text-white">Bluestrike</span>
    </div> --}}

    <h2 style="color: #0f172a;">Hello,</h2>

    <p>Kindly enter the code below to complete your LOGIN action.</p>

    <div style="
      background-color: #f8f9fc;
      border-radius: 8px;
      padding: 20px;
      text-align: center;
      margin: 30px 0;
    ">
      <div style="font-size: 13px; color: #64748b; margin-bottom: 6px;">2FA Code</div>
      <div style="font-size: 32px; font-weight: bold; color: #2563eb;">
        {{ $user->two_factor_code }}
      </div>
    </div>

    <p>If you didn't request this OTP, please contact our support and change your password immediately.</p>

    <br>
    <p style="color: #475569;">Bluestrike.</p>
  </div>
</body>
</html>
