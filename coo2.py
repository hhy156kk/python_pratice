#coding=utf-8
'''
【程序2】
题目：企业发放的奖金根据利润提成。利润(I)低于或等于10万元时，奖金可提10%；利润高
　　　于10万元，低于20万元时，低于10万元的部分按10%提成，高于10万元的部分，可可提
　　　成7.5%；20万到40万之间时，高于20万元的部分，可提成5%；40万到60万之间时高于
　　　40万元的部分，可提成3%；60万到100万之间时，高于60万元的部分，可提成1.5%，高于
　　　100万元时，超过100万元的部分按1%提成，从键盘输入当月利润I，求应发放奖金总数？
1.程序分析：请利用数轴来分界，定位。注意定义时需把奖金定义成长整型。　　　　　　
2.程序源代码：
'''
def calculate():

    if number <= 100000:
        sum = number * 0.1
    elif number > 100000 and number < 200000:
        sum = 100000 * 0.1 + (number - 100000) * 0.075
    elif number > 200000 and number < 400000:
        sum = 100000 * 0.1 + 100000 * 0.075 + (number-200000) * 0.05
    elif number > 400000 and number < 600000:
        sum = 100000 * 0.1 + 100000 * 0.075 + 200000 * 0.05 + (number - 400000)*0.03
    elif number > 600000 and number < 1000000:
        sum = 100000 * 0.1 + 100000 * 0.075 + 200000 * 0.05 + 200000 * 0.03 + (number - 600000) * 0.015
    else:
        sum = 100000 * 0.1 + 100000 * 0.075 + 200000 * 0.05 + 200000 * 0.03 + 400000 * 0.015 + (number-1000000) * 0.01

    return sum

if __name__ == '__main__':

    number = int(raw_input())
    ans = calculate()
    print ans