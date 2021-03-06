"""goal words

Revision ID: 5db8f67f9d0c
Revises: f1d5aef34006
Create Date: 2022-05-16 16:27:00.333429

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '5db8f67f9d0c'
down_revision = 'f1d5aef34006'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('goal_words',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('date', sa.String(length=64), nullable=True),
    sa.Column('asia', sa.String(length=64), nullable=True),
    sa.Column('north_america', sa.String(length=64), nullable=True),
    sa.Column('europe', sa.String(length=64), nullable=True),
    sa.Column('africa', sa.String(length=64), nullable=True),
    sa.Column('sounth_america', sa.String(length=64), nullable=True),
    sa.Column('oceania', sa.String(length=64), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('goal_words')
    # ### end Alembic commands ###
