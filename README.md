# 士業マッチングサイト
仕事がほしい事務所と人材がほしい事務所のマッチングサービスです

![TOP画面](https://asset.shigyo-match.site/assets/main-visual04.jpg)

# リンク
* サイトリンク：https://www.shigyo-match.site

#「ゲストユーザーでログイン」
* ゲストユーザーとしてログインのうえ、認証を要するサービスもご精査いただけます
* ただし、プロフィール変更機能のうち、ログインIDの変更はできないようになっております。

# 制作目的
* パブリッククラウド（今回はAWS）の基礎学習
* Docker、ECS、ECRなどコンテナ基盤による開発環境
* CircleCIを使ったCI/CDによるビルド、テスト、デプロイの自動化
* SPA、CDN配信ツール活用によるパフォーマンスの向上
* ESLint、Prettierなどのコード整形ツール、PHPStanなどの静的解析ツールによる、コードの可読性向上と無用な紛争の回避

# 使用技術
* PHP 7.3
* Laravel 6.9
* Vue.js 2.6.11
* SCSS
* MySQL 5.7.29
* Nginx 1.15
* AWS
  * VPC
  * ECS/ECR
  * EC2/ALB
  * RDS for MySQL
  * S3
  * CloudFront
  * Route53
  * ACM
  * SES
* Docker
* CircleCI
  * ecs-deploy
* GitHub

# クラウドアーキテクチャ
![クラウドアーキテクチャ](https://asset.shigyo-match.site/assets/ShigyoMatch.jpg)

CircleCIからECRにpushしたイメージを、ECSのEC2インスタンスタイプでデプロイしています。
webサーバーにNginxを使い、ALBでリクエストの分配を行っています。

S3とCloudFrontを使ったassetsその他画像ファイルのCDN配信も行っております。


# 開発環境
* MacBookPro
* Docker for Mac
* Git

docker-composeでNginx、Laravel、MySQLを起動し、Volumeをマウントしております。

GitHubはBacklogで切った課題のキーをブランチ名のsuffixとし、push。CIが成功すればmasterにマージし、デプロイまでの自動化を行っております。

# 機能一覧
* 認証機能（ログイン、ログアウト、新規登録、退会、パスワードリマインダー）
* SNSログイン（Twitter）
* 募集案件の投稿、削除、一覧表示、詳細表示
* 募集案件一覧のソート、絞り込み機能
* ページング機能
* 画像アップロード機能（プロフィール画像、募集案件サムネイル）
* 案件に対する申込機能
* ブックマーク機能（「気になる」ボタン）
* スカウト機能
* フォロー機能
* フォロー／フォロワー一覧表示
* マッチ後のユーザーに対するレビュー機能
* マイページ画面（ユーザーに紐づく一覧系）
* メール送信機能（新規登録、申込時、フォローされた時、「気になる」された時、スカウトされた時）  

# アピールポイント

* Laravel、Vue.jsの連携によるSPAサイトを作成しました
* AWSの基礎的なサービスを使い、SSL化、ロードバランシング、CDN配信などを達成しました
* ローカル環境にDocker for Mac、本番環境にECS、ECRを採用し、コンテナ基盤による開発環境を構築しました
* GitHubにCircleCIを連携させ、ビルド、テスト、デプロイの自動化を達成しました
* ESLintとPrettierによるコード整形、作業ごとにGitブランチの切り、push時はプルリクエストを作成するなど、チームによる開発を意識して開発を進めました


# 今後の課題
* もしアップデートするならば
  * ~~「パスワードリマインダー」~~ ← 機能追加しました
  * ~~「退会」~~ ← 機能追加しました
  * ~~「都道府県による絞り込み」~~ ← 機能追加しました
  * 「マップ表示」
  * ~~「Socialログイン」~~ ← 機能追加しました
  * 「画像のアップロードをドラッグ&ドロップでできる」
  
  といったあたりを実装したい
* CircleCIによるビルドに約２分、自動デプロイに約８分程度要し、時間短縮が必要。また、マイグレーションファイルによるカラム変更に時折未反映が発生するなど見直しも必要。
* 初めてということもありAWSによる環境構築のGUI操作は時間がかかったことと、手順書管理からの脱却のため、今後はTerraformやCloudFormationによるインフラのコード化を学習予定。
* 処理の共通化（DRY原則）や無用な先回りで結局使用しなかったメソッド（YAGNI原則）などは完璧でなかった。
