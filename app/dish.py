from . import app, db, users
from .models import Vote, Dish, MealDish, MealTime, Meal

from flask import abort, jsonify


def get_vote_status(vote_type):
    if vote_type is None:
        return "none"
    else:
        return vote_type


def get_dish_data(dish, vote_type):
    return {
        "name": dish.dish_description,
        "score": dish.score,
        "id": dish.id,
        "vote_type": get_vote_status(vote_type),
        "allergyflags": map(lambda x: x.allergyflag, dish.allergyflags)
    }


def get_dishes_data(date, servery, meal_type):
    valid_vote = db.and_(
        Vote.user == users.current_user(),
        Vote.dish_id == Dish.id)

    query = db.session.query(Dish).join(Dish.mealdishes).join(MealDish.meal)\
        .join(Meal.mealtime).outerjoin(Vote, valid_vote)\
        .options(db.joinedload('allergyflags'))\
        .filter(
            Meal.date == date,
            MealTime.meal_type == meal_type,
            MealTime.servery == servery
        ).add_columns(Vote.vote_type)

    return [get_dish_data(dish, vote_type) for dish, vote_type in query.all()]


def create_or_get_vote(dish, user):
    vote = db.session.query(Vote).filter(
        Vote.user == user,
        Vote.dish == dish).scalar()

    if vote is None:
        print user, dish
        vote = Vote(
            user=user,
            dish=dish)

        db.session.add(vote)
        db.session.commit()

    return vote


@app.route('/api/dishes/<int:dish_id>/vote/<vote_type>')
def vote(dish_id, vote_type):
    if vote_type not in ("up", "down", "none"):
        abort(404)

    user = users.current_user()
    dish = db.session.query(Dish).get(dish_id)

    if user is None:
        abort(403)

    relationship = create_or_get_vote(dish, user)

    update_score_on_vote_removal(relationship)

    relationship.vote_type = vote_type

    update_score_on_vote_addition(relationship)

    db.session.commit()

    result = {"new_score": relationship.dish.score}

    return jsonify(result)


def update_score_on_vote_removal(old_vote):
    dish = old_vote.dish
    if old_vote.vote_type == "up":
        dish.score -= 1
    elif old_vote.vote_type == "down":
        dish.score += 1


def update_score_on_vote_addition(new_vote):
    dish = new_vote.dish
    if new_vote.vote_type == "up":
        dish.score += 1
    elif new_vote.vote_type == "down":
        dish.score -= 1
