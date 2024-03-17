

def is_digits(st):
    return all([c.isdigit() for c in st]) and (st is not None)

def max_loan(salary):
    return 0.3 * salary * 12

def loan_is_possible(salary,duration,loan):
    if duration > 12 :
        return False
    if loan > 0.3 * duration * salary :
        return False
    return True