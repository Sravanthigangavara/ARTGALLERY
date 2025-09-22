pipeline {
    agent any

    stages {

        // ===== FRONTEND BUILD =====
        stage('Build Frontend') {
            steps {
                dir('frontend/artgallery') {
                    bat 'npm install'
                    bat 'npm run build'
                }
            }
        }

        // ===== FRONTEND DEPLOY =====
        stage('Deploy Frontend to Tomcat') {
            steps {
                bat '''
                set TOMCAT_DIR=C:\\Program Files\\Apache Software Foundation\\Tomcat 9.0

                :: Stop Tomcat service (optional, if running as a service)
                net stop Tomcat9

                if exist "%TOMCAT_DIR%\\webapps\\SDP" (
                    rmdir /S /Q "%TOMCAT_DIR%\\webapps\\SDP"
                )
                mkdir "%TOMCAT_DIR%\\webapps\\SDP"

                xcopy /E /I /Y frontend\\artgallery\\dist\\* "%TOMCAT_DIR%\\webapps\\SDP"

                :: Start Tomcat service again
                net start Tomcat9
                '''
            }
        }

        // ===== BACKEND BUILD =====
        stage('Build Backend') {
            steps {
                dir('backend/ARTBACKEND') {
                    bat '"C:\\Users\\srava\\Downloads\\apache-maven-3.9.11-bin\\apache-maven-3.9.11\\bin\\mvn.cmd" clean package'
                }
            }
        }

        // ===== BACKEND DEPLOY =====
        stage('Deploy Backend JAR') {
            steps {
                bat '''
                set DEPLOY_DIR=C:\\deployments

                if not exist "%DEPLOY_DIR%" (
                    mkdir "%DEPLOY_DIR%"
                )

                if exist "%DEPLOY_DIR%\\artgalleryapp.jar" (
                    del /Q "%DEPLOY_DIR%\\artgalleryapp.jar"
                )

                copy "backend\\ARTBACKEND\\target\\artgalleryapp.jar" "%DEPLOY_DIR%\\"

                :: Stop old process if running on 8080
                for /f "tokens=5" %%a in ('netstat -ano ^| findstr :8080') do taskkill /PID %%a /F

                :: Start new JAR in background
                start java -jar "%DEPLOY_DIR%\\artgalleryapp.jar"
                '''
            }
        }
    }

    post {
        success {
            echo 'Deployment Successful!'
        }
        failure {
            echo 'Pipeline Failed.'
        }
    }
}
