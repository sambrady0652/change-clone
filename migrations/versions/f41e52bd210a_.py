"""empty message

Revision ID: f41e52bd210a
Revises: 2f729d6f6950
Create Date: 2020-09-04 15:38:34.951237

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'f41e52bd210a'
down_revision = '2f729d6f6950'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('users', 'encrypted_password',
               existing_type=sa.VARCHAR(),
               type_=sa.LargeBinary(),
               existing_nullable=False)
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('users', 'encrypted_password',
               existing_type=sa.LargeBinary(),
               type_=sa.VARCHAR(),
               existing_nullable=False)
    # ### end Alembic commands ###
