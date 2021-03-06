# -*- coding: utf-8 -*-
# Generated by Django 1.9.12 on 2017-01-16 06:02
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Favorite',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('user_id', models.CharField(max_length=250)),
                ('track_id', models.CharField(max_length=50)),
            ],
            options={
                'verbose_name': 'Favorite',
                'verbose_name_plural': 'Favorites',
            },
        ),
        migrations.CreateModel(
            name='Playlist',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('playlist_name', models.CharField(max_length=250)),
                ('user_id', models.CharField(max_length=250)),
                ('track_id', models.CharField(max_length=50)),
                ('title', models.CharField(max_length=250)),
                ('artist', models.CharField(max_length=250)),
                ('img_url', models.CharField(max_length=250)),
                ('stream_url', models.CharField(max_length=250)),
                ('duration', models.IntegerField()),
                ('platform', models.CharField(max_length=50)),
            ],
            options={
                'verbose_name': 'Playlist',
                'verbose_name_plural': 'Playlists',
            },
        ),
        migrations.AlterUniqueTogether(
            name='playlist',
            unique_together=set([('playlist_name', 'user_id')]),
        ),
        migrations.AlterUniqueTogether(
            name='favorite',
            unique_together=set([('user_id', 'track_id')]),
        ),
    ]
