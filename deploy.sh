#!/bin/bash -x

if [[ $# -gt 1 ]] && [[ "$1" == "-e" ]]; then
  ENV=$2
  shift 2
else
  echo "you need to specify an environment to deploy with : -e testing or -e production"
  exit 1
fi

if [[ "$ENV" == "production" ]]; then
  export REACT_APP_API_URL=https://backend.passculture.beta.gouv.fr/
elif [[ "$ENV" == "testing" ]]; then
  export REACT_APP_API_URL=https://backend.passculture-testing.beta.gouv.fr/
fi

if ! command -v netlify 2>/dev/null; then
  npm install -g netlify-cli@1.2.3
fi

rm -rf node_modules/ build/
yarn install
yarn build

netlify deploy -e "$ENV"


