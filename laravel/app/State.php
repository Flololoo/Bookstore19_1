<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class State extends Model
{
    protected $fillable = [
        'comment', 'status', 'order_id'
    ];
    //
    public function order() : BelongsTo{
        return $this->belongsTo(Order::class);
    }

    /*public function states() : HasMany { TODO maybe causes error
        return $this->hasMany(State::class);
    }*/
}
