class Logic:
    def __init__(self, nums:list, target:int):
        self.nums = nums
        self.target = target
    def do_sum(self):
        print('nums = ',self.nums)
        print('target = ',self.target)
        for i in range(len(self.nums)):
            for j in range(i + 1, len(self.nums)):
                if self.nums[i] + self.nums[j] == self.target:
                    return [i, j]

if __name__ == '__main__':
    #example 1
    example_one = Logic([2,7,11,15],13)
    print('Output = ',example_one.do_sum())

    # example 2
    example_two = Logic([3,2,4], 6)
    print('Output = ',example_two.do_sum())

    # example 3
    example_three = Logic([3,3], 6)
    print('Output = ',example_three.do_sum())



