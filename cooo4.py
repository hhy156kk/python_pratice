

days = [0,31,28,31,30,31,30,31,31,30,31,30,31]

year = int(raw_input('year:'))
month = int(raw_input('month:'))
day = int(raw_input('day:'))

if ((year - 2000) % 4 == 0):
    days[2] = days[2] + 1

sum = 0
for i in range(month):
    sum = sum + days[i]

sum = sum + day

print sum

