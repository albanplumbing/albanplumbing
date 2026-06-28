<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'message' => 'Method not allowed.']);
    exit;
}

function field(string $name): string
{
    return trim((string)($_POST[$name] ?? ''));
}

function clean_header(string $value): string
{
    return str_replace(["\r", "\n"], '', $value);
}

$name = field('name');
$email = field('email');
$phone = field('phone');
$service = field('service');
$postcode = field('postcode');
$address = field('address');
$date = field('date');
$time = field('time');
$subjectLine = field('subject');
$message = field('message');
$humanCheck = field('human_check');

if ($name === '' || $email === '' || $phone === '' || $service === '' || $postcode === '' || $humanCheck === '') {
    http_response_code(422);
    echo json_encode(['ok' => false, 'message' => 'Please complete all required fields.']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(422);
    echo json_encode(['ok' => false, 'message' => 'Please enter a valid email address.']);
    exit;
}

$to = 'info@albanplumbing.co.uk';
$from = 'info@albanplumbing.co.uk';
$safeService = clean_header($service);
$subject = clean_header('Website booking request - ' . ($safeService !== '' ? $safeService : 'Service enquiry'));

$bodyLines = [
    'New booking request from the website:',
    '',
    'Name: ' . $name,
    'Phone: ' . $phone,
    'Email: ' . $email,
    'Address: ' . $address,
    'Postcode: ' . $postcode,
    'Service Required: ' . $service,
    'Preferred Date: ' . $date,
    'Preferred Time: ' . $time,
    'Subject: ' . $subjectLine,
    '',
    'Message:',
    $message,
    '',
    'Source: ' . ($_SERVER['HTTP_REFERER'] ?? ''),
    'IP Address: ' . ($_SERVER['REMOTE_ADDR'] ?? ''),
];

$plainBody = implode("\n", $bodyLines);
$replyTo = clean_header($email);
$boundary = 'aph_' . bin2hex(random_bytes(12));
$headers = [
    'MIME-Version: 1.0',
    'From: Alban Plumbing Website <' . $from . '>',
    'Reply-To: ' . clean_header($name) . ' <' . $replyTo . '>',
    'Content-Type: multipart/mixed; boundary="' . $boundary . '"',
];

$mailBody = "--{$boundary}\r\n";
$mailBody .= "Content-Type: text/plain; charset=UTF-8\r\n";
$mailBody .= "Content-Transfer-Encoding: 8bit\r\n\r\n";
$mailBody .= $plainBody . "\r\n";

$allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
$maxFileBytes = 5 * 1024 * 1024;
$maxTotalBytes = 10 * 1024 * 1024;
$totalBytes = 0;

if (isset($_FILES['photos']) && is_array($_FILES['photos']['name'])) {
    $fileCount = count($_FILES['photos']['name']);

    for ($i = 0; $i < $fileCount; $i++) {
        $error = $_FILES['photos']['error'][$i] ?? UPLOAD_ERR_NO_FILE;
        if ($error === UPLOAD_ERR_NO_FILE) {
            continue;
        }

        if ($error !== UPLOAD_ERR_OK) {
            http_response_code(422);
            echo json_encode(['ok' => false, 'message' => 'One of the uploaded photos could not be read.']);
            exit;
        }

        $tmpName = $_FILES['photos']['tmp_name'][$i] ?? '';
        $size = (int)($_FILES['photos']['size'][$i] ?? 0);
        $type = (string)($_FILES['photos']['type'][$i] ?? '');
        $originalName = basename((string)($_FILES['photos']['name'][$i] ?? 'photo'));

        if ($size <= 0 || $size > $maxFileBytes || !in_array($type, $allowedTypes, true)) {
            http_response_code(422);
            echo json_encode(['ok' => false, 'message' => 'Photos must be JPG, PNG, WEBP or GIF and under 5MB each.']);
            exit;
        }

        $totalBytes += $size;
        if ($totalBytes > $maxTotalBytes) {
            http_response_code(422);
            echo json_encode(['ok' => false, 'message' => 'Uploaded photos are too large in total.']);
            exit;
        }

        $content = file_get_contents($tmpName);
        if ($content === false) {
            continue;
        }

        $mailBody .= "--{$boundary}\r\n";
        $mailBody .= 'Content-Type: ' . $type . '; name="' . addslashes($originalName) . '"' . "\r\n";
        $mailBody .= "Content-Transfer-Encoding: base64\r\n";
        $mailBody .= 'Content-Disposition: attachment; filename="' . addslashes($originalName) . '"' . "\r\n\r\n";
        $mailBody .= chunk_split(base64_encode($content)) . "\r\n";
    }
}

$mailBody .= "--{$boundary}--\r\n";

$sent = @mail($to, $subject, $mailBody, implode("\r\n", $headers), '-f' . $from);

if (!$sent) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'message' => 'The email could not be sent.']);
    exit;
}

echo json_encode(['ok' => true, 'message' => 'Your booking request has been sent.']);
