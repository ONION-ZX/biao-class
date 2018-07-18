git add $1 && git commit -m "$2" && git push -u origin master
# eg: sh update_git.sh $1 $2  
# $1 代表第一个参数 填写更新的文件或者目录
# $2 代表第一个参数 填写备注 commit