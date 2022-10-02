echo "Kill all the running PM2 actions"
sudo pm2 kill

echo "Jump to app folder"
cd /home/ubuntu/projects/next-airbnb-clone

echo "Update app from Git"
git pull

echo "Install app dependencies"
sudo rm -rf node_modules package-lock.json
yarn install

echo "Build your app"
npm run build

echo "Run new PM2 action"
pm2 start /home/ubuntu/projects/ecosystem.json