# Node.js の公式イメージをベースイメージとして使用
FROM node:20-slim

# 作業ディレクトリを設定
WORKDIR /app

# 必要なファイルをコピー
COPY package.json package-lock.json ./

# 依存関係をインストール
RUN npm install

# アプリケーションのソースコードをコピー
COPY . .

# アプリケーションをビルド
RUN npm run build

# アプリケーションを起動するコマンドを指定
# コンテナ起動のたびに node_modules と package-lock.json を削除し、npm install を実行
CMD sh -c "rm -rf node_modules package-lock.json && npm install && npm run start"

# ポート 3000 を公開
EXPOSE 3000
