
curl -L 'https://bsky.social/xrpc/com.atproto.server.createSession' \
    -H 'Content-Type: application/json' \
    -H 'Accept: application/json' \
    -d '{"identifier": "mian-zaid.bsky.social", "password": "'"$BSKY_PASS"'"}'


echo "\nGet Session\n";

curl -L 'https://bsky.social/xrpc/com.atproto.server.getSession'