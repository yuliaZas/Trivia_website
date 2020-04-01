from flask import Flask
from flask import request
import requests
import json

app = Flask(__name__)


# TODO: main window
@app.route('/')
def hello_world():
    return 'Hello, World!'


def api_php_request(number_questions, category, difficulty, question_type):
    """
    The function get the params from the GET request ang generates an api POST request.
    The POST request returns a data which need to be parsed to a question and answers.
    :param number_questions: The amount of questions
    :type number_questions: int
    :param category: The category which the player wants to play
    :type category: string
    :param difficulty: The difficulty the player wants to play
    :type difficulty: string
    :param question_type:  The type of the questions the player wants to play
    :type question_type: string
    :return: Dictionary with the data relevant to the question
    :rtype: dictionary
    """

    fixed_address = 'https://opentdb.com/api.php?'
    amount = 'amount=' + number_questions
    category = 'category=' + category

    if difficulty is not None:
        difficulty = 'difficulty=' + difficulty
    if question_type is not None:
        type = 'type=' + question_type

    user_request_address_adjustment = amount + '&' + category + '&' + difficulty + '&' + type
    api_url = fixed_address + user_request_address_adjustment

    return api_url


def response_code_handling(response_code):
    if response_code is 1:
        print("No Results Could not return results. The API doesn't have enough questions for your query.")
    elif response_code is 2:
        print("Invalid Parameter Contains an invalid parameter. Arguments passed in aren't valid.")
    elif response_code is 3:
        print("Token Not Found Session Token does not exist.")
    elif response_code is 4:
        print("Token Empty Session Token has returned all possible questions for the specified query."
              "Resetting the Token is necessary.")


def question_parser(response_from_post_request):
    """
    The function gets the dictionary which "api_php_request" returned and parse it to question and answers.
    :return: The question
    :rtype: string
    """
    if response_from_post_request['response_code'] is 0:
        question = response_from_post_request['results'][0]['question']
        if response_from_post_request['results'][0]['type'] == 'multiple':
            correct_answer = response_from_post_request['results'][0]['correct_answer']
            incorrect_answers_list = response_from_post_request['results'][0]['incorrect_answers']
            incorrect_answers = ''
            for answer in incorrect_answers_list:
                incorrect_answers += answer + ' ; '
            correct_and_incorrect_answer = correct_answer + '\\' + incorrect_answers
        else:
            correct_answer = response_from_post_request['results'][0]['correct_answer']
            incorrect_answer = response_from_post_request['results'][0]['incorrect_answers'][0]
            correct_and_incorrect_answer = correct_answer + '\\' + incorrect_answer
    else:
        response_code_handling(response_from_post_request['response_code'])

    return question + '\\' + correct_and_incorrect_answer


def post_request_api(api_url):
    response_to_read = requests.post(url=api_url)
    response = json.loads(response_to_read.text)
    return response


@app.route('/ques_generator', methods=['GET'])
def question_generator():
    """
    This is the GET request from the player.
    :return: The relevant question
    :rtype: string
    """

    difficulty = request.args.get('difficulty')
    question_type = request.args.get('type')
    category = request.args.get('category')
    amount = request.args.get('amount')

    api_url = api_php_request(amount, category, difficulty, question_type)
    response_from_post_request = post_request_api(api_url)
    question = question_parser(response_from_post_request)

    return question


if __name__ == '__main__':
    app.run()


# https://opentdb.com/api.php?amount=10&category=9
# https://opentdb.com/api.php?amount=1&category=25&difficulty=easy&type=multiple
# http://127.0.0.1:5000/ques_generator?amount=1&category=25&difficulty=easy&type=multiple


"""
difficulty: any, easy, medium, hard
q_type(type): any, multi, tf
number of questions(amount): right now one question
category: make a map with key for the category and val with the number associated
"""

