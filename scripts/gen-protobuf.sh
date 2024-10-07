#!/bin/sh
ROOT="$(dirname "$0")/.."
PROTO_URL="https://raw.githubusercontent.com/elgranjero/EggIncProtos/main/ei.proto"

# fetch the latest proto file
curl -s $PROTO_URL > $ROOT/proto/ei.proto

mkdir -p $ROOT/src/proto

# actually generate the protobufs...
"$ROOT/node_modules/grpc-tools/bin/protoc" \
  --plugin "$ROOT/node_modules/.bin/protoc-gen-ts" \
  --ts_out "$ROOT/src" \
  ./proto/ei.proto || exit 1

# ...and then make some edits to the generated output.
# 1) globally replace a broken constant
# 2) prepend "// @ts-nocheck" to the file to prevent tsbuild warnings
sed -i '' \
  -e 's/MissionInfo.Spaceship.CHICKEN_ONE/0/g' \
  -e '1s;^;// @ts-nocheck\n;' \
  "$ROOT/src/proto/ei.ts"
