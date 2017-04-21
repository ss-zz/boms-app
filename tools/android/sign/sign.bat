@echo off
SETLOCAL

echo ===========================
echo ��ӭʹ��ANDROID�Զ�ǩ������
echo ===========================

set defaultKey=default.keystore
set defaultTargetApk=release.apk
set defaultApkPath=..\..\..\platforms\android\build\outputs\apk\android-release-unsigned.apk
set defaultKeyPwd=sinosoftionicapp

CHOICE /M �Ƿ�ʹ��Ĭ�ϵ���Կ�ļ���%defaultKey%��?

IF %errorlevel%==1 goto :UseDefaultKey
IF %errorlevel%==2 goto :InputSignPath

:UseDefaultKey
	echo ʹ��Ĭ����Կ�ļ���%defaultKey%��
	echo Ĭ����Կ����������Ϊ��
	echo ***************************
	echo %defaultKeyPwd%
	echo ***************************
	set signpath=%defaultKey%

	goto SelectApkPath

:InputSignPath
	set /p signpath=������ǩ���ļ�·����
	IF NOT EXIST %signpath% (
		echo ǩ���ļ���%signpath%�������ڣ�����������
		goto InputSignPath
	) ELSE (
		goto SelectApkPath
	)
	

:SelectApkPath
	CHOICE /M "�Ƿ�ʹ��Ĭ�ϵ�apk·����%defaultApkPath%������ȷ����ִ�����ionic build android --release������δǩ��apk?"
	IF %errorlevel%==1 goto :UseDefaultApkPath
	IF %errorlevel%==2 goto :InputApkPath

:UseDefaultApkPath
	echo ʹ��Ĭ��apk·����%defaultApkPath%��
	set apkpath=%defaultApkPath%
	goto Sign
	
	
:InputApkPath
	set /p apkpath=�������ǩ��apk��·����
	IF NOT EXIST %apkpath% (
		echo apk�ļ���%apkpath%�������ڣ�����������
		goto InputApkPath
	) ELSE (
		goto Sign
	)

:Sign
	echo ��Կ�ļ���%signpath%
	echo ��ǩ��apk��%apkpath%
	jarsigner -verbose -keystore %signpath% -signedjar %defaultTargetApk% %apkpath% %signpath%
	echo ǩ��apk�����ɡ�%defaultTargetApk%��
	goto Exit

:Exit

endlocal
