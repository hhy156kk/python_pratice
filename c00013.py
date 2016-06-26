

def calculate(n):
    x = n % 10
    n = n /10
    y = n % 10
    n = n / 10
    z = n % 10
    n = n / 10
    return x,y,z

for i in range(100,1000):
    x,y,z = calculate(i)
    if (x*x*x + y*y*y + z*z*z) == i:
        print i

