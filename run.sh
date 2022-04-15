export STAGING_URL = "/pay/"
export STAGING_IMAGE = "vh-payment"
docker build --build-arg PUBLIC_URL=$STAGING_URL --build-arg REACT_APP_COMMIT_SHA="dev" -t $STAGING_IMAGE .
