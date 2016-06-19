#coding=utf-8
'''
【程序1】
题目：有1、2、3、4个数字，能组成多少个互不相同且无重复数字的三位数？都是多少？
1.程序分析：可填在百位、十位、个位的数字都是1、2、3、4。组成所有的排列后再去
　　　　　　掉不满足条件的排列。
2.程序源代码：
'''

answer = 0
def search(n):


    if n == 3:
        for i in range(3):
            print f[i],
        print("\n")
        global answer
        answer = answer + 1
        return None

    for i in range(1,5):
        if a[i] == False:
            f[n] = i
            a[i] = True
            search(n+1)
            a[i] = False

f =[1,2,3]
a = []
if __name__ == '__main__':

    for i in range(5):
        a.append(False)
    search(0)
    print(answer)