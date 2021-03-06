"""goal_words new names

Revision ID: 475e88f58ee4
Revises: 5db8f67f9d0c
Create Date: 2022-05-18 18:10:20.417078

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '475e88f58ee4'
down_revision = '5db8f67f9d0c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('goal_words', sa.Column('south_america', sa.String(length=64), nullable=True))
    op.add_column('goal_words', sa.Column('australia', sa.String(length=64), nullable=True))
    op.drop_column('goal_words', 'sounth_america')
    op.drop_column('goal_words', 'oceania')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('goal_words', sa.Column('oceania', sa.VARCHAR(length=64), nullable=True))
    op.add_column('goal_words', sa.Column('sounth_america', sa.VARCHAR(length=64), nullable=True))
    op.drop_column('goal_words', 'australia')
    op.drop_column('goal_words', 'south_america')
    # ### end Alembic commands ###
